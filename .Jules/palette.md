## 2024-05-23 - Traffic Light Controls & Focus States
**Learning:** Traffic light buttons (Red, Yellow, Green) have strong semantic expectations from macOS. Red=Close/Reload, Yellow=Minimize, Green=Maximize/Fullscreen. Matching these behaviors is critical for intuitive UX in 'OS-like' interfaces. Also, tooltip visibility relying solely on hover excludes keyboard users; adding `group-focus-visible:opacity-100` is a simple fix.
**Action:** When implementing OS-style controls, ensure functionality matches color conventions. Always pair hover states with focus-visible states for accessibility.
