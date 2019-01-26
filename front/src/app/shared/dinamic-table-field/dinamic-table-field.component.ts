import {ChangeDetectorRef, Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ToastFactory} from "../toast-factory";

@Component({
  selector: 'app-dinamic-table-field',
  templateUrl: './dinamic-table-field.component.html',
  styleUrls: ['./dinamic-table-field.component.css']
})
export class DinamicTableFieldComponent implements OnInit {

  @Input()
  objectArray;

  @Input()
  editable: boolean = true;

  private rightClickedRow;
  private rightClickedColumn;
  private rightClickedItem;

  menuPosition;
  menuPositionX;
  menuPositionY;
  menuWidth;
  menuHeight;
  innerHeight;
  innerWidth ;
  windowWidth ;
  windowHeight;
  menuState: boolean;

  /**
   * Context menu
   */
  @ViewChild('contextMenu')
  contextMenu;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if(!this.objectArray || !Array.isArray(this.objectArray) || this.objectArray.length ==  0) {
      this.resetTable();
    }
  }

  addRow() {
    let obj = this.objectArray[0];
    let columns = Object.keys(obj);
    let newRow = {};

    columns.forEach(key => {
      newRow[key] = '';
    });

    this.objectArray.push(newRow);
  }

  addColumn() {
    let propertyHash: string = Math.random().toString(36).substring(7);

    this.objectArray.map(item => {
      item[propertyHash] = '';
      return item;
    });
  }

  getObjectKey(obj) {
    return Object.keys(obj);
  }

  onKeyUp(obj, key, value) {
    obj[key] = value;
  }

  resetTable() {
    if(!Array.isArray(this.objectArray)) {
      this.objectArray = [];
    }
    // remove all items if objectArray is populated
    this.objectArray.length = 0;

    // set default objectArray
    this.objectArray.push({p1: ''});
  }

  onRightClick(event, obj, rowIndex, columnIndex) {
    this.rightClickedItem = obj;
    this.rightClickedRow = rowIndex;
    this.rightClickedColumn = columnIndex;


    event.stopPropagation();
    this.menuState = true;
    this.positionMenu(event);
  }

  deleteRow() {
    if(this.objectArray.length > 1) {
      this.objectArray.splice(this.rightClickedRow, 1);
    } else {
      ToastFactory.warningToast('Your table must have at least one row.');
    }

  }

  deleteColumn() {

    if(Object.keys(this.rightClickedItem).length > 1) {
      this.objectArray.forEach(item => {
        delete item[this.rightClickedColumn];
      });
    } else {
      ToastFactory.warningToast('Your table must have at least one column.');
    }

  }


  getPosition(e) {
    let posx = 0;
    let posy = 0;
    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft +
        document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop +
        document.documentElement.scrollTop;
    }
    return {x: posx,y: posy}
  }

  positionMenu(e) {
    this.menuPosition = this.getPosition(e);
    this.menuPositionX = this.menuPosition.x;
    this.menuPositionY = this.menuPosition.y;

    this.cdr.detectChanges();

    this.menuWidth = this.contextMenu.nativeElement.offsetWidth;
    this.menuHeight = this.contextMenu.nativeElement.offsetHeight;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;

    if ((this.windowWidth - this.menuPositionX) < this.menuWidth) {
      this.menuPositionX = this.windowWidth - this.menuWidth + "px";
    } else {
      this.menuPositionX = this.menuPositionX + "px";
    }
    /*if ((this.windowHeight - this.menuPositionY) < this.menuHeight) {
      this.menuPositionY = this.windowHeight - this.menuHeight + "px";
    } else {
      this.menuPositionY = this.menuPositionY + "px";
    }*/
    this.menuPositionY += "px";
  }

  /*
  * Event listeners to close context menu
  */
  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    this.menuState=false;
  }

  @HostListener('document:contextmenu', ['$event'])
  public documentRClick(event: Event): void {
    this.menuState=false;
  }
}
