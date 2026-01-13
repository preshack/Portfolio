## 2024-05-23 - Traffic Light Controls
**Learning:** macOS-style window controls (Red/Yellow/Green) are popular for aesthetics but often lack accessibility. Users expect them to behave like native controls (Red=Close/Reload, Yellow=Minimize, Green=Maximize) and reveal symbols on hover.
**Action:** When implementing "traffic lights", always add `aria-label`s and use group-hover to reveal clarifying icons (X, -, +) to support both accessibility and user expectation.
