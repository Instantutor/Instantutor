# Request Lifecycle

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
```

### New request made
status: open

### Tutor sees request
status: open

state: CHECKING

### Tutor accepted
status: open

state: ACCEPT

### Tutor denied
status: open

state: DENY

### Tutoring in progress
status: tutoring

state: ACCEPT

### Student cancels
status: deny

state: ACCEPT

### Tutor cancels
status: tutoring

state: DENY

### Request closed
status: closed

state: ACCEPT

### Student rates
status: rated

state: ACCEPT

### Tutor rates
status: closed

state: RATED
