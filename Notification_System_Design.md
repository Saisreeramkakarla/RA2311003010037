# Notification System Design (Stage 1)

## Approach
- Fetch notifications from API
- Assign priority:
  Placement > Result > Event
- Sort by:
  1. Priority
  2. Timestamp (latest first)
- Select top 10 notifications

## Efficiency
- Sorting: O(n log n)
- Can be optimized using heap (priority queue)

## Logging
- Used logging middleware for:
  - API calls
  - Error handling
  - Output generation