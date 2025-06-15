# Guest List Manager

A simple web app to manage a guest list with persistent storage using localStorage. Add guests with name and relationship, track attendance, and delete entries. Data persists across page reloads.

## Features

- Add guests (max 10), prevent duplicates
- Track attendance (attend / not attend) via dropdown
- Delete guests with a button
- Color-coded relationship tags
- Guest list saved in localStorage
- Dynamic summary of attending and not attending guests

## Usage

1. Enter guest name and relationship, then submit.
2. Change attendance status from the dropdown.
3. Delete guests using the trash icon.
4. Data is saved automatically and restored on reload.

## Guest Object Example
{
name: "Morris",
relationship: "Friend",
date: "15, 6, 2025 ; 14:06:30",
attendance: "attend"
}
## License

This project is open-source and free to use.

## Author

Munene Morris
---

*Data is stored locally; clearing browser data will erase the list.*

