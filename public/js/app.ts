import Interfaces = Domain.Interfaces;
import PatientRecord = Domain.Classes.PatientRecord;
import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
import IHttpPromise = angular.IHttpPromise;
angular.module("patientRecordsApp", ['ngRoute'])
    .config(($routeProvider) => {
        $routeProvider
            .when("/", {
                templateUrl: "PatientList.html",
                controller: "ListController",
                resolve: {
                    patientRecords: (PatientRecords) => {
                        return PatientRecords.getPatientRecords();
                    }
                }
            })
            .when("/patientrecord/:patientRecordId", {
                controller: "EditPatientRecordController",
                templateUrl: "PatientRecord.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("PatientRecords", function ($http: ng.IHttpService) {
        const API_PATH = "/patientrecords/";
        this.getPatientRecords = function () {
            return $http.get(API_PATH)
                .then((response: IHttpPromiseCallbackArg<Interfaces.IPatientRecord[]>) => {
                    return response;
                }, (response) => {
                    alert("Error finding patient records.");
                });
        }
        this.getPatientRecord = (patientRecordId) => {
            const url = API_PATH + patientRecordId;
            return $http.get(url)
                .then((response: IHttpPromiseCallbackArg<Interfaces.IPatientRecord[]>) => {
                    const x = response.data;
                    return response;
                }, (response) => {
                    alert("Error finding this record.");
                });
        }
        this.editPatientRecord = (patientRecord: Interfaces.IPatientRecord) => {
            const url = API_PATH + patientRecord._id;
            console.log(patientRecord._id);
            return $http.put(url, patientRecord)
                .then((response: IHttpPromise<any>) => {
                    return response;
                }, (response) => {
                    alert("Error editing this record.");
                    console.log(response);
                });
        }
        this.deletePatientRecord = (patientRecordId) => {
            const url = API_PATH + patientRecordId;
            return $http.delete(url)
                .then((response: IHttpPromise<any>) => {
                    return response;
                }, (response) => {
                    alert("Error deleting this patient record.");
                    console.log(response);
                });
        }
    })
    .controller("ListController", (patientRecords, $scope) => {
        $scope.patientRecords = [];
        patientRecords.data.forEach((pr) => {
            $scope.patientRecords.push(new PatientRecord(pr));
        });

        $scope.propertyName = 'patient.meta.name.last';
        $scope.reverse = false;

        $scope.sortBy = (propertyName) => {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        }
    })
    .controller("EditPatientRecordController", ($scope, $routeParams, PatientRecords) => {
        PatientRecords.getPatientRecord($routeParams.patientRecordId).then((doc) => {
            $scope.patientrecord = doc.data;
        }, (response) => {
            alert(response);
        });

        $scope.toggleEdit = () => {
            $scope.editMode = true;
            $scope.patientRecordFormUrl = "PatientRecord-form.html";
        }

        $scope.back = () => {
            $scope.editMode = false;
            $scope.patientRecordFormUrl = "";
        }

        $scope.savePatientRecord = (patientrecord: Interfaces.IPatientRecord) => {
            const updatedPatientRecord = new PatientRecord(patientrecord);
            PatientRecords.editPatientRecord(updatedPatientRecord);
            $scope.editMode = false;
            $scope.patientRecordFormUrl = "";
        }

        $scope.deletePatientRecord = (patientRecordId) => {
            PatientRecords.deletePatientRecord(patientRecordId);
        }
    });