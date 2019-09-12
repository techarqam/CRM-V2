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
        archived: new FormControl(false),
        user: new FormControl(""),
        // user: new FormControl(firebase.auth().currentUser.uid),
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
        // user: new FormControl(firebase.auth().currentUser.uid),
        user: new FormControl(""),
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
        // user: new FormControl(firebase.auth().currentUser.uid),
        user: new FormControl(""),
        timestamp: new FormControl(moment().format())
    });
    task = new FormGroup({
        type: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        description: new FormControl(""),
        client: new FormControl(""),
        status: new FormControl("Pending"),
        // assignTo: new FormControl(firebase.auth().currentUser.uid),
        // assignedBy: new FormControl(firebase.auth().currentUser.uid),
        assignTo: new FormControl(""),
        assignedBy: new FormControl(""),
        dueTime: new FormControl(moment().format(), Validators.compose([
            Validators.required,
        ])),
        timestamp: new FormControl(moment().format())
    });
    message = new FormGroup({
        message: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        reciever: new FormControl("", Validators.compose([
            Validators.required,
        ])),
        sender: new FormControl(""),
        timestamp: new FormControl(moment().format())
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
        // generatedBy: new FormControl(firebase.auth().currentUser.uid),
        generatedBy: new FormControl(""),
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
        password: new FormControl("", Validators.compose([
            Validators.minLength(6)
        ])),
        status: new FormControl("Unverified", Validators.compose([
            Validators.required,
        ])),
        isAdmin: new FormControl(false, Validators.compose([
            Validators.required,
        ])),
        addedBy: new FormControl(""),
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