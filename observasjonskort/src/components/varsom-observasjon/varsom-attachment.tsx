import { Component, Prop, h } from '@stencil/core';


@Component({
  tag: 'varsom-attachment',
  styleUrl: 'varsom-attachment.css',
  shadow: true,
  assetsDirs: ['images']
})
export class VarsomAttachment {

  @Prop() registrationName: any;
  @Prop() comment: any;
  @Prop() imageUrl: any;
  @Prop() photographer: any;
  @Prop() copyright: any;
  @Prop() strings?: any;
 

  render(){
    return <div class="container">
      {this.imageUrl ? 
        <div>
        <img src={this.imageUrl} />
      </div>
      : ""} 

      {this.registrationName ? 
      <div>
        <label>label mangler: </label>
        {this.registrationName}
      </div>
      : ""} 
    
    {this.comment ? 
      <div>
        <label>label mangler: </label>
        {this.comment}
      </div>
      : ""} 

    {this.photographer ? 
      <div>
        <label>label mangler: </label>
        {this.photographer}
      </div>
      : ""} 

    {this.copyright ? 
      <div>
        <label>label mangler: </label>
        {this.copyright}
      </div>
      : ""} 
      
    </div>
  }
    
  }

  
  