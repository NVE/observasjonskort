import { Component, Prop, h, State } from '@stencil/core';
import { format, getDataFromApiByTypeAndNumber } from '../../utils/utils';
import { getDataFromApiById } from '../../utils/utils';

 type Observation = {
 _moh?: number,
 _imageUrl?: string
};


@Component({
  tag: 'varsom-observation',
  styleUrl: 'varsom-observation.css',
  shadow: true,
})
export class VarsomObservation {

  @State() regId: string;
  @State() moh: number;
  @State() imageUrl: string;
  @State() numberOfObservations: number;

  @State() observations: Observation[] = []; //when multiple observations they are stored in an array
 
  @Prop() id: string;
  @Prop() language: string = "Norwegian";
  
  @Prop() type: string;

 
  @Prop() number: number = 1;

  componentDidLoad(){
    if (this.id !== undefined){ //if id is sent to component, it will only show this observation
    getDataFromApiById(this.id)
    .then((data => {
      
      this.regId = data["RegId"];
      this.moh = data["ObsLocation"]["Height"];
      this.imageUrl = data["Attachments"][0]["Url"];
      
      //etc
      //etc

    }));
  }

  if (this.type !== undefined){
    getDataFromApiByTypeAndNumber(this.type, this.number, this.language).then((data => {
      
     
    
     for(let i = 0; i < this.number; i++){

     //source: https://pipinghot.dev/snippet/check-if-an-array-has-length-in-javascript-typescript/
      this.observations.push({
        _imageUrl: (data[i]["Attachments"][0] && data[i]["Attachments"][0] !== 0) ? data[i]["Attachments"][0]["Url"] : "", //check if image is included
        _moh: this.moh = data[i]["ObsLocation"]["Height"]}
        
    
     );
  
      
     }

  
    }));
  }
}
     


  renderMultiple(){
    
    return <div>{this.observations.map((item: any = {}) =>
    <div>
      <img src={item._imageUrl}></img>
      moh: {this.moh}
      ___ ___ ___
    </div>
    )}
    
    </div>
  }

 
    private getText(): string {
      return <div>id : {this.id}, type: {this.type}, number: {this.number} </div>;
    }
  
    render() {
      if (this.type !== undefined) {
        
        return this.renderMultiple();
        }

      return <div class="observation-container"> 
      <div class="observation-header">
        <h1>Region region</h1>
        <b>ID: ...</b></div>
      
      <div class="observation-metadata">
        Observert 10.5.2023. 06:50 Registrert 10.5.23. 09:15
         Oppdatert 10.5.23 09:15
         <br></br>
         Ikon faretype ... ikon moh {this.moh}  .... 
         bruker brukerRating..... SvvDrift???
      </div>
      <div class="observation-image-container">
        <img alt="comment..." class="observation-image" src={this.imageUrl}></img>
        <img alt="comment..." class="observation-image" src={this.imageUrl}></img>
        <br></br>
        <b>Opphavsrett:</b> nve@nve.no <br></br>
        <b>Fotograf:</b> fotograf... <br></br>
        <b>Kommentar:</b> Statens vegvesen...
      </div>

      <div class="observation-content">
        <h2>Faretegn</h2>
        <b>Type: </b> Overvann i terreng <b>Kommentar: 
           </b> ... 
           Område: På dette stedet. Beskrivelse: Det renner vann 
          overalt
        <br></br>
        type... kommentar....

        <h2>Skredhendelse</h2>
        <b>Tid: </b>Mellom tidspunkt og tidspunkt... <b>Skredtype: </b>flomskred
         <b> Størrelse: </b> 100m3
         <br></br>
         <b>Trigger: </b>Graving i området <b>Omfang: </b>trafikk hindret
         <br></br>
         <b>Stemte varsel på varsom.no? </b> varsel ikke kjent
         <b>Kommentar: </b>her er ytterligere beskrivelse av hendelsen

         <h2>Notater</h2>
         <b>Tekst: </b>enda mer beskrivelse under "notat"

      </div>

      </div>
      
    }
  }
