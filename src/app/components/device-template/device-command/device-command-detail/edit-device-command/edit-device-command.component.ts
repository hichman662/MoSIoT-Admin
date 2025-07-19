import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeviceTemplateAdapterComponent } from 'src/app/adapters/device-template-adapter/device-template-adapter.component';
import { SweetAlertsComponent } from 'src/app/components/shared/sweet-alerts/sweet-alerts.component';
import { Command } from 'src/app/models/Device Template/command';
import { DeviceTemplate } from 'src/app/models/Device Template/device-template';
import { DeviceTemplateService } from 'src/app/services/device-template.service';

@Component({
  selector: 'app-edit-device-command',
  templateUrl: './edit-device-command.component.html',
  styleUrls: ['./edit-device-command.component.scss']
})
export class EditDeviceCommandComponent implements OnInit {
  device!:DeviceTemplate;
  command!:Command;
  id!:number;

  isNew:boolean = false;

  deviceCommandForm = this.fb.group({
    name:['',Validators.required],
    type:['', Validators.required],
    synchronous:[''],
    description:['', Validators.required]
  })

  get name() { return this.deviceCommandForm.get('name'); }
  get type() { return this.deviceCommandForm.get('type'); }
  get synchronous() { return this.deviceCommandForm.get('synchronous'); }
  get description() { return this.deviceCommandForm.get('description'); }
  
  constructor(private sweetAlert:SweetAlertsComponent, private fb:FormBuilder, private deviceService:DeviceTemplateService, 
    private router:Router, private activatedRoute: ActivatedRoute, private deviceAdapter: DeviceTemplateAdapterComponent) { }

  ngOnInit(): void {
    this.device = JSON.parse('' + localStorage.getItem('deviceDetail'));
    this.activatedRoute.params.subscribe((params: Params) => this.id = params['commandId']);
    this.command = this.device.commands?.find(command => command.id == this.id)!;

    //If not exists, create new
    if(this.command == undefined){
      this.isNew = true;
      this.initDefaults();
    }
    this.deviceCommandForm.setValue({name: this.command.name, type: this.command.type, synchronous: this.command.isSynchronous, description: this.command.description});
  }

  initDefaults(){
    this.command = {
      description: "",
      id: 0,
      isSynchronous: false,
      name: "",
      type: 1
    }
  }

  editDeviceCommand(){
    this.command.name = this.deviceCommandForm.get('name')?.value;
    this.command.type = this.deviceCommandForm.get('type')?.value;
    this.command.isSynchronous = this.deviceCommandForm.get('synchronous')?.value;
    this.command.description = this.deviceCommandForm.get('description')?.value;

    if(this.isNew){
      this.deviceService.createCommand(this.deviceAdapter.newCommnad(this.command, this.device.id)).subscribe({
        next : result =>{
          this.command = result;
        },
        error : error => {
          this.sweetAlert.createError("command",error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.id);
          this.sweetAlert.createSuccess("command");
        }
      });
    }
    else{
      this.deviceService.updateDeviceCommand(this.command.id,this.command).subscribe({
        next : result =>{
          console.log(result);
        },
        error : error => {
          this.sweetAlert.updateError(error);
        },
        complete : () => {
          localStorage.setItem('deviceDetail',JSON.stringify(this.device));
          this.router.navigateByUrl("DeviceTemplate/" + this.device.name + "/Command/" + this.command.id);
          this.sweetAlert.updateSuccess();
        }
      });
    }
  }

  cancelDeviceCommand(){
    this.router.navigateByUrl("DeviceTemplate/ " + this.device.id);
  }
}
