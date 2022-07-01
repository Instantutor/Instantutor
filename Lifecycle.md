# Request Lifecycle

Below are the diagrams for request lifecycle. The first is the old diagram and if you click a node it will link you to a section telling you the status and the state. The same will be true of the second diagram which is the proposed changes to the request lifecycle.

## Old Diagram

Here is a simple flow chart:

```mermaid
graph TD
    A(New request made by users) --> B(Student selects tutor to ping)
    B --> C(Tutor sees request)
    C --> |Tutor Accepts Requst| D(Student can give final confirmation)
    C --> |Tutor Denies Requst| E(Tutor is removed from the student list)
    D --> |Student chooses a different tutor or denies| F(Tutor is removed from the students list)
    D --> |Student confirms tutor| G(Tutoring in progress)
    G --> |Student cancels| H(Student cancelled)
    G --> |Tutor cancels| I(Tutor cancelled)
    G --> |Tutor or student closes request| J(Request closed)
    J --> |Student rates| K(Student rated)
    J --> |Tutor rates| M(Tutor rated)
    click A "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#new-request-made"
    click C "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#tutor-sees-request"
    click D "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#tutor-accepted"
    click E "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#tutor-denied"
    click G "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#tutoring-in-progress"
    click H "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#student-cancels"
    click I "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#tutor-cancels"
    click J "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#request-closed"
    click K "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#student-rated"
    click M "https://github.com/Instantutor/Instantutor/blob/main/Lifecycle.md#tutor-rated"
```

### New request made
* status: open

### Tutor sees request
* status: open
* state: CHECKING

### Tutor accepted
* status: open
* state: ACCEPT

### Tutor denied
* status: open
* state: DENY

### Tutoring in progress
* status: tutoring
* state: ACCEPT

### Student canceled
* status: deny
* state: ACCEPT

### Tutor canceled
* status: tutoring
* state: DENY

### Request closed
* status: closed
* state: ACCEPT

### Student rated
* status: rated
* state: ACCEPT

### Tutor rated
* status: closed
* state: RATED
