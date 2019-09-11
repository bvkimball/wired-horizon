![wired horizon](https://cdn.rawgit.com/bvkimball/wired-horizon/example/horizon-chart.gif)

# wired-horizon

Hand-drawn sketchy horizon chart web component.

Built on top of wired-elememts: [wiredjs.com](http://wiredjs.com/)

## Usage

Add wired-horizon to your project:

```
npm i @bvkimball/wired-horizon
```

Import wired-horizon definition into your HTML page:

```html
<script type="module" src="wired-horizon/lib/wired-horizon.js"></script>
```

Or into your module script:

```javascript
import { WiredHorizon } from "wired-horizon"
```

Use it in your web page:

```html
<wired-horizon bands="3" series="[10,30,25,50,15,15,35,9,18]"></wired-horizon>
<wired-horizon bands="1" series="[10,30,25,50,15,15,35,9,18]"></wired-horizon>
<wired-horizon id="realtime" max="100" bands="4" labels='["older", "newer"]' series="[10,30,25,50,15,15,35,9,18]"></wired-horizon>
```

## Properties

**min** - Minimum value. Default is 0.

**max** - Maximum value. Default is Unset.

**bands** - Number of layers the graph is split into

**series** - Numeric series of data representing the chart

**labels** - Labels are evenly displayed along bottom of the chart

## Custom CSS Variables

**--wired-horizon-label-color** Color of the label. Default is _black_.

**--wired-horizon-label-background** Backgroind of label. Default is _rgba(255,255,255,0.9)_.

**--wired-horizon-font-size** Font size of the label. Default is _14px_

**--wired-horizon-band-color-[1-8]** A series of 8 colors (color are evenly distributed based on number of bands)

## License

MIT License (c) Brian Kimball
