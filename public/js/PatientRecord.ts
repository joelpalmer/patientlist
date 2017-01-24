
module Domain.Classes {
    export class PatientRecord implements Interfaces.IPatientRecord {
        _id: Interfaces.Id
        updated: Interfaces.Updated;
        created: Interfaces.Created;
        patient: Interfaces.Patient;
        treatment: Interfaces.Treatment;
        type: string;
        archived: boolean;
        attachments: any[];
        history: Interfaces.History[];
        tags: any[];
        referring: Interfaces.Referring;
        disposition: Interfaces.Disposition;
        __v: number;
        queryData: Interfaces.QueryData;
        hidden: boolean;
        outreachData: Interfaces.OutreachData;
        workflow: Interfaces.Workflow;
        status: Interfaces.Status;
        formData: Interfaces.FormData;

        constructor(obj: Interfaces.IPatientRecord) {
            $.extend(this, obj);
        }
    }
}