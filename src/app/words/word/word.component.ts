import { Component, OnInit, Input } from '@angular/core';
import { SyllableType, SyllableInfo } from '../words.component';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {
  SyllableType = SyllableType;

  @Input() word: SyllableInfo;
  @Input() nextWord: SyllableInfo;
  @Input() previousWord: SyllableInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
