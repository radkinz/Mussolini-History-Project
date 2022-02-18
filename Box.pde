class Box {
  int x, y, w, h, pin;

  Box(int startx, int starty, int pinloc) {
    x = startx;
    y = starty;
    w = boxWidth;
    h = boxHeight;
    pin = pinloc;
  }

  void show() {
    rect(x, y, w, h);
  }

  boolean lightOn() {
    if (mouseX > x && mouseX < x+boxWidth && mouseY > y && mouseY < y+boxHeight && mousePressed) {
      return true;
    } else {
      return false;
    }
  }
}
