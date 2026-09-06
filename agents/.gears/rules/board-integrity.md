# Board integrity

end_goal_ref: ../../../.admin/docs/plan-suites/mindmap-v1/END-GOAL.md

- Embed referenced images in portable documents; never depend on imported source paths.
- Keep camera/theme state alongside the editor scene and validate before replacing active content.
- Serialize writes by board identity and revision. Never acknowledge newer edits from an older save completion.
- Preserve the prior valid file on failure and retain unsaved edits. Flush or cancel safely on switch/close.
- Keep filesystem privileges in named main-process operations; reject unsafe names and unsupported formats.
- Tool presets affect new elements. Theme changes preserve authored content and toolset access.

Status: HOLD guidance. Implementation evidence is pending.
