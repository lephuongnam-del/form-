import { Component, OnInit, VERSION } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  createForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormHandle();
  }

  get chapters() {
    console.log(this.createForm.get('chapterList'));
    return this.createForm.get('chapterList') as FormArray;
  }

  // get subChapter() {
  //   return <FormGroup>this.createForm.get('subChapter').controls[].get('subChapter')
  // }

  initChapter() {
    return this.fb.group({
      mainChapterName: this.fb.control(''),
      subChapters: this.fb.array([]),
    });
  }

  initSubChapter() {
    return this.fb.group({
      subChapterName: this.fb.control(''),
    });
  }

  createFormHandle() {
    this.createForm = this.fb.group({
      chapterList: this.fb.array([]),
    });
  }

  addChapter() {
    this.chapters.push(this.initChapter());
  }

  addSubhapter(i: any) {
    (<FormArray>this.chapters['controls'][i].get('subChapters')).push(
      this.initSubChapter()
    );
  }

  getChapter(form: any) {
    console.log(form);
    return form.controls.chapterList.controls;
  }

  getSubChapter(form: any, i: number) {
    console.log(form.controls[i].controls.subChapters);
    return form.controls[i].controls.subChapters;
  }

  onSubmit(form) {}

  removeChapter(i: any) {
    this.chapters.removeAt(i);
  }

  removeSubChapter(j: any, i: any) {
    console.log('here', j);
    (<FormArray>this.chapters['controls'][j].get('subChapters')).removeAt(i);
  }
}
