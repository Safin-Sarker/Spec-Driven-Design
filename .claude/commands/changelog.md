Update CHANGELOG.md in the project root by following these steps precisely:

## Step 1 — Read current state

Run `git log --pretty=format:"%ad|%s" --date=short` to get all commits.
Filter out any line whose subject starts with `Merge`.

## Step 2 — Check whether CHANGELOG.md exists

**If CHANGELOG.md does not exist:**

Create it from scratch. Group the filtered commits by date (YYYY-MM-DD), most recent date first. Use this format:

```
# Changelog

## YYYY-MM-DD
- <commit subject>
- <commit subject>

## YYYY-MM-DD
- <commit subject>
```

Write the file, then report how many dates and entries were added.

**If CHANGELOG.md already exists:**

Read the file. Find the most recent date heading (the first `## YYYY-MM-DD` line).
From the git log output, collect only commits whose date is newer than that heading date, or commits on the same date whose subject is not already listed as a bullet under that heading.
Prepend those entries at the top of the file (after the `# Changelog` title), keeping the existing content intact.
Write the file, then report what was added.

## Step 3 — Confirm

Show the user the top portion of the updated CHANGELOG.md (the first 30 lines) so they can verify it looks correct.
