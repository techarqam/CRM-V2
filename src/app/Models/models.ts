import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as firebase from 'firebase';
export class ModelsService {
    project = new FormGroup({
        name: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
        client: new FormControl(""),
        description: new FormControl(""),
        archived: new FormControl(false, Validators.required),
        company: new FormControl("", Validators.required),
        user: new FormControl("", Validators.required),
        timestamp: new FormControl(moment().format())
    });
    client = new FormGroup({
        name: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
        phone: new FormControl("", Validators.compose([
            Validators.maxLength(10),
            Validators.minLength(10),
        ])),
        mail: new FormControl("", Validators.compose([
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        company: new FormControl("", Validators.required),
        user: new FormControl("", Validators.required),
        timestamp: new FormControl(moment().format())
    });
    file = new FormGroup({
        name: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
        project: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        company: new FormControl("", Validators.required),
        user: new FormControl("", Validators.required),
        timestamp: new FormControl(moment().format())
    });
    task = new FormGroup({
        type: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        description: new FormControl(""),
        client: new FormControl(""),
        status: new FormControl("Pending"),
        assignTo: new FormControl("", Validators.required),
        assignedBy: new FormControl("", Validators.required),
        dueTime: new FormControl(moment().format(), Validators.compose([
            Validators.required,
        ])),
        company: new FormControl("", Validators.required),
        timestamp: new FormControl(moment().format())
    });
    message = new FormGroup({
        message: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        reciever: new FormControl("", Validators.required),
        sender: new FormControl("", Validators.required),
        company: new FormControl("", Validators.required),
        timestamp: new FormControl(moment().format(), Validators.required)
    });

    invoice = new FormGroup({
        startDate: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        endDate: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        amount: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        generatedBy: new FormControl("", Validators.required),
        company: new FormControl("", Validators.required),
        timestamp: new FormControl(moment().format())
    });

    signUp = new FormGroup({
        adminName: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
        companyName: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(4)
        ])),
        email: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        terms: new FormControl(false, Validators.compose([
            Validators.required,
        ])),
        timestamp: new FormControl(moment().format(), Validators.compose([
            Validators.required,
        ])),
    });

    user = new FormGroup({
        name: new FormControl("", Validators.compose([
            Validators.minLength(5)
        ])),
        email: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        active: new FormControl(true, Validators.compose([
            Validators.required
        ])),
        password: new FormControl("", Validators.compose([
            Validators.minLength(6)
        ])),
        status: new FormControl("Unverified", Validators.compose([
            Validators.required,
        ])),
        isAdmin: new FormControl(false, Validators.compose([
            Validators.required,
        ])),
        company: new FormControl("", Validators.required),
        addedBy: new FormControl("", Validators.required),
        timestamp: new FormControl(moment().format(), Validators.compose([
            Validators.required,
        ])),
    });


    signIn = new FormGroup({
        email: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
        ])),
        pass: new FormControl("", Validators.compose([
            Validators.required,
            Validators.minLength(6)
        ])),
    });

}