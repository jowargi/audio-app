interface HoverIntentOptions {
  sensitivity?: number;
  interval?: number;
  element: HTMLElement;
  over: (this: HTMLElement, event?: PointerEvent) => void;
  out: (this: HTMLElement, event: PointerEvent) => void;
}

export class HoverIntent {
  public sensitivity: number;
  public interval: number;
  public element: HTMLElement;
  public over: (this: HTMLElement, event?: PointerEvent) => void;
  public out: (this: HTMLElement, event: PointerEvent) => void;

  protected _onPointerEnter: (event: PointerEvent) => void;
  protected _onPointerLeave: (event: PointerEvent) => void;
  protected _onPointerMove: (event: PointerEvent) => void;
  protected _trackSpeed: () => void;

  private isOverElement: boolean;
  private isHover: boolean;
  private lastPointerMoveEvent: PointerEvent | undefined;
  private speedCheckTimerId: number | undefined;
  private prevX!: number;
  private prevY!: number;
  private prevTime!: number;
  private lastX!: number;
  private lastY!: number;
  private lastTime!: number;

  constructor({
    sensitivity = 0.1,
    interval = 100,
    element,
    over,
    out,
  }: HoverIntentOptions) {
    this.sensitivity = sensitivity;
    this.interval = interval;
    this.element = element;
    this.over = over;
    this.out = out;

    this._onPointerEnter = this.onPointerEnter.bind(this);
    this._onPointerLeave = this.onPointerLeave.bind(this);
    this._onPointerMove = this.onPointerMove.bind(this);
    this._trackSpeed = this.trackSpeed.bind(this);

    this.isOverElement = false;
    this.isHover = false;
    this.lastPointerMoveEvent = undefined;
    this.speedCheckTimerId = undefined;

    this.element.addEventListener("pointerenter", this._onPointerEnter);
    this.element.addEventListener("pointerleave", this._onPointerLeave);
  }

  public destroy(): void {
    this.element.removeEventListener("pointerenter", this._onPointerEnter);
    this.element.removeEventListener("pointerleave", this._onPointerLeave);
    this.element.removeEventListener("pointermove", this._onPointerMove);

    clearInterval(this.speedCheckTimerId);
  }

  private onPointerEnter(event: PointerEvent): void {
    if (this.isOverElement) return;

    this.isOverElement = true;

    this.prevX = event.clientX;
    this.prevY = event.clientY;
    this.prevTime = Date.now();

    this.element.addEventListener("pointermove", this._onPointerMove);

    this.speedCheckTimerId = setInterval(this._trackSpeed, this.interval);
  }

  private onPointerLeave(event: PointerEvent): void {
    if (!this.isOverElement) return;

    this.isOverElement = false;

    this.element.removeEventListener("pointermove", this._onPointerMove);

    clearInterval(this.speedCheckTimerId);

    if (this.isHover) {
      this.isHover = false;

      this.out.call(this.element, event);
    }
  }

  private onPointerMove(event: PointerEvent): void {
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    this.lastTime = Date.now();

    this.lastPointerMoveEvent = event;
  }

  private trackSpeed(): void {
    let speed: number;

    if (!this.lastTime || this.prevTime === this.lastTime) {
      speed = 0;
    } else {
      speed =
        Math.sqrt(
          Math.pow(this.prevX - this.lastX, 2) +
            Math.pow(this.prevY - this.lastY, 2),
        ) /
        (this.lastTime - this.prevTime);
    }

    if (speed < this.sensitivity) {
      clearInterval(this.speedCheckTimerId);

      this.isHover = true;

      this.over.call(this.element, this.lastPointerMoveEvent);
    } else {
      this.prevX = this.lastX;
      this.prevY = this.lastY;
      this.prevTime = this.lastTime;
    }
  }
}
