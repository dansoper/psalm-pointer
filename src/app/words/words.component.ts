import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export class SyllableInfo {
  text?: string;
  type: SyllableType;
}
export enum SyllableType {
  Word,
  WordStart,
  WordMiddle,
  WordEnd,
  Barline
}

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss']
})
export class WordsComponent implements OnInit, OnChanges {
  SyllableType = SyllableType;

  @Input() words: string;
  wordsArray: SyllableInfo[] = [];

  wordSylls: { [key: string]: string[] } = {
    "unto": ["un", "to"],
    "into": ["in", "to"]
  };

  calcWords() {
    this.wordsArray = flatten(this.words.split(" ").map(a => {
      if (this.wordSylls[a] != null) {
        return this.wordSylls[a].map((b, i, arr) => {
          if (i === 0) {
            return {
              text: b,
              type: SyllableType.WordStart
            };
          } else if (i === arr.length - 1) {
            return {
              text: b,
              type: SyllableType.WordEnd
            };
          } else {
            return {
              text: b,
              type: SyllableType.WordMiddle
            };
          }
        });
      } else {
        return {
          text: a,
          type: SyllableType.Word
        };
      }
    }), false);
    this.wordsArray.push({
      type: SyllableType.Barline
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.calcWords();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes.words.previousValue != changes.words.currentValue) {
      this.calcWords();
    }
  }


}

// This is done in a linear time O(n) without recursion
// memory complexity is O(1) or O(n) if mutable param is set to false
function flatten(array, mutable) {
  var toString = Object.prototype.toString;
  var arrayTypeStr = '[object Array]';
  
  var result = [];
  var nodes = (mutable && array) || array.slice();
  var node;

  if (!array.length) {
      return result;
  }

  node = nodes.pop();
  
  do {
      if (toString.call(node) === arrayTypeStr) {
          nodes.push.apply(nodes, node);
      } else {
          result.push(node);
      }
  } while (nodes.length && (node = nodes.pop()) !== undefined);

  result.reverse(); // we reverse result to restore the original order
  return result;
}