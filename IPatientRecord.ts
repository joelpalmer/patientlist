module Domain.Interfaces {

    export interface Id {
        $oid: string;
    }

    export interface Updated {
        $date: Date;
    }

    export interface Created {
        $date: Date;
    }

    export interface Dob {
        $date: Date;
    }

    export interface Office {
        _id: Id;
        type: string;
        name: string;
        unumber: string;
    }

    export interface PhoneNumber {
        number: string;
        doNotCall: boolean;
        _id: Id;
    }

    export interface Name {
        sortable: string;
        first: string;
        last: string;
    }

    export interface Meta {
        dob: Dob;
        office: Office;
        phone: string;
        phoneNumbers: PhoneNumber[];
        name: Name;
    }

    export interface Patient {
        _id: Id;
        type: string;
        meta: Meta;
        unumber: string;
        status: string;
    }

    export interface Treatment {
        _id: Id;
        type: string;
        name: string;
        status: string;
    }

    export interface Transition {
        name: string;
        type: string;
        _id: Id;
        slug: string;
    }


    export interface From {
        name: string;
        type: string;
        _id: Id;
        slug: string;
    }


    export interface To {
        name: string;
        type: string;
        _id: Id;
        slug: string;
    }

    export interface Status {
        from: From;
        to: To;
    }

    export interface Ts {
        $date: Date;
    }

    export interface History {
        _id: Id;
        type: string;
        transition: Transition;
        status: Status;
        ts: Ts;
    }

    export interface Provider {
        _id: Id;
        type: string;
        name: Name;
        status: string;
    }

    export interface Referring {
        provider: Provider;
        providerJoined: boolean;
        allowOutreach: boolean;
    }

    export interface Disposition {
        tags: any[];
    }

    export interface QueryData {
        officeType: string;
    }

    export interface QueueDate {
        $date: Date;
    }

    export interface UpdateTs {
        $date: Date;
    }

    export interface OutreachData {
        scheduled: boolean;
        outreachType: string;
        priority: number;
        queueDate: QueueDate;
        updateBy?: any;
        updateTs: UpdateTs;
    }

    export interface Workflow {
        _id: Id;
        type: string;
        name: string;
        slug: string;
    }



    export interface Form {
        _id: Id;
        type: string;
    }


    export interface ChartReview {
        form: Form;
        ts: Ts;
    }

    export interface FormData {
        chartReview: ChartReview;
    }

    export interface IPatientRecord {
        _id: Id;
        updated: Updated;
        created: Created;
        patient: Patient;
        treatment: Treatment;
        type: string;
        archived: boolean;
        attachments: any[];
        history: History[];
        tags: any[];
        referring: Referring;
        disposition: Disposition;
        __v: number;
        queryData: QueryData;
        hidden: boolean;
        outreachData: OutreachData;
        workflow: Workflow;
        status: Status;
        formData: FormData;
    }

}

