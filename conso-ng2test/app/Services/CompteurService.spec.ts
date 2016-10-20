

import {JsonPipe} from "@angular/common";


describe('CompteurService', function(){

let pipe = new JsonPipe();

  it('transforms {"abc": 2} to "{\"abc\": 2}"', () => {
    expect(pipe.transform({"abc": 2})).toBe("{\"abc\": 2}");
  }); 


 it('true is true', () => expect(true).toBe(true));



});