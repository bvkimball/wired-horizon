import { WiredBase, customElement, property, TemplateResult, html, css, CSSResult } from "wired-lib/lib/wired-base"
import { rectangle, hachureFill } from "wired-lib"

@customElement("wired-horizon")
export class WiredHorizon extends WiredBase {
  @property({ type: Array }) series = []
  @property({ type: Array }) labels = []
  @property({ type: Number }) bands = 1
  @property({ type: Number }) min = 0
  @property({ type: Number }) max = NaN

  private box?: SVGElement

  static get styles(): CSSResult {
    return css`
      :host {
        display: block;
        position: relative;
        height: 42px;
        font-family: sans-serif;
        opacity: 0;
      }
      :host(.wired-rendered) {
        opacity: 1;
      }
      svg {
        display: block;
      }
      path {
        stroke: currentColor;
        stroke-width: 0.7;
        fill: transparent;
      }
      .labelContainer {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        list-style: none;
        justify-content: space-between;
        padding-inline-start: 0;
        margin-block-start: 0em;
        margin-block-end: 0em;
      }
      .horizonLabel {
        color: var(--wired-horizon-label-color, #000);
        font-size: var(--wired-horizon-font-size, 10px);
        background: var(--wired-progress-label-background, transparent);
        padding: 2px 6px;
        border-radius: 4px;
        letter-spacing: 1.25px;
      }
      .horizon-band path {
        stroke-width: 2.75;
        fill: none;
      }
      .band-1 path {
        stroke: var(--wired-band-color-1, rgba(49, 54, 149, 0.8));
      }
      .band-2 path {
        stroke: var(--wired-band-color-2, rgba(69, 117, 180, 0.8));
      }
      .band-3 path {
        stroke: var(--wired-band-color-3, rgba(116, 173, 209, 0.8));
      }
      .band-4 path {
        stroke: var(--wired-band-color-4, rgba(171, 217, 233, 0.8));
      }
      .band-5 path {
        stroke: var(--wired-band-color-5, rgba(254, 224, 144, 0.8));
      }
      .band-6 path {
        stroke: var(--wired-band-color-6, rgba(253, 174, 97, 0.8));
      }
      .band-7 path {
        stroke: var(--wired-band-color-6, rgba(244, 109, 67, 0.8));
      }
      .band-8 path {
        stroke: var(--wired-band-color-7, rgba(215, 48, 39, 0.8));
      }
    `
  }

  render(): TemplateResult {
    return html`
      <div class="svgContainer">
        <svg id="svg"></svg>
      </div>
      <ul class="labelContainer">
        ${this.labels.map(
          item =>
            html`
              <li class="horizonLabel">${item}</li>
            `
        )}
      </ul>
    `
  }

  updated() {
    const svg = (this.shadowRoot!.getElementById("svg") as any) as SVGSVGElement
    while (svg.hasChildNodes()) {
      svg.removeChild(svg.lastChild!)
    }
    const s = this.getBoundingClientRect()
    svg.setAttribute("width", `${s.width}`)
    svg.setAttribute("height", `${s.height}`)
    if (!this.box) {
      this.box = rectangle(svg, 0, 0, s.width, s.height)
    } else {
      svg.appendChild(this.box)
    }

    let points: [number, number][] = []
    let maxheight = isNaN(this.max) ? Math.max(...this.series) : this.max
    let graphHeight = s.height * this.bands
    for (let band of Array(this.bands).keys()) {
      for (let [index, value] of this.series.entries()) {
        let htRatio = (value * graphHeight) / (maxheight * graphHeight)
        let x = (s.width / (this.series.length - 1)) * index
        let y = htRatio * graphHeight
        points.push([x, graphHeight - y])
      }
      const fill = hachureFill([[0, graphHeight], ...points, [s.width, graphHeight]])
      svg.appendChild(fill)

      let bandColorIdx = this.bands > 1 ? Math.floor((band / (this.bands - 1)) * 7) + 1 : 1
      fill.classList.add("horizon-band")
      fill.classList.add(`band-${bandColorIdx}`)
      fill.style.transform = `translate(0px, ${-(s.height * (this.bands - (band + 1)))}px)`
    }
    this.classList.add("wired-rendered")
  }
}
