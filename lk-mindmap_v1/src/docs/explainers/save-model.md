# How saving works

LYRIKAI board saves your work to a `.lkmindmap` file on disk. The top bar shows where things stand.

## Autosave

After you edit, the app waits briefly, then saves automatically. You do not need to tap Save for every small change.

## Save and Save as

**Save** (disk icon or menu) writes the current board to its file right away. **Save as…** lets you pick a new filename or location — useful for a copy or when the original path is unavailable.

## Save states

| State | Meaning |
|-------|---------|
| **Not saved yet** | New board; nothing written to disk |
| **Unsaved changes** | Edits since the last successful save |
| **Saving…** | Write in progress |
| **All changes saved** | Disk matches what you see |
| **Save failed** | Last write did not finish — edits are still on screen |

## Backups

Before overwriting a file, the app keeps a **recovery copy** alongside it (same name with `.bak` added). If a save fails or a file is damaged, that copy may help you recover. Keep it until you know the main file opens correctly.
