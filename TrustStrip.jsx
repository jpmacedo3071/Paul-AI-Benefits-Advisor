# Paul Benefits Coach, Host Page UI kit

This is a pixel-polished recreation of the **host page** that surrounds the Paul AI Benefits Advisor chat widget at `benefitscoach.advicehr.net`.

The goal (per the brief): **make the page around the widget look pretty**, without touching the widget itself. The live widget is owned by `jpmacedo3071/Paul-AI-Benefits-Advisor` and must stay as-is; in this kit, `ChatWidget.jsx` is a visual stand-in that mirrors the widget's exact look so the full page composes correctly.

## Files

- `index.html`, the full host page, interactive
- `Header.jsx`, top bar with logo + wordmark
- `Hero.jsx`, "Say Hi to Paul" title + supporting copy
- `TrustStrip.jsx`, privacy / confidentiality strip with iconography
- `ChatWidget.jsx`, stand-in for the real widget (styling-only recreation)
- `FAQ.jsx`, quick-answers block
- `Footer.jsx`, contact + disclaimer

## How it renders

A calm, centred column: header → serif hero → trust strip → chat widget → FAQ → footer. Paul sits as the hero element, exactly where the widget is embedded today. All surrounding chrome is new.
