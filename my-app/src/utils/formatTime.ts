export function formatMessageTime(timestamp: string): string {
  // Parse the timestamp - assuming format like "10:30 AM" or full date if provided
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // If timestamp is just time (HH:MM AM/PM format), assume it's today
  if (timestamp.includes(':') && !timestamp.includes('/') && !timestamp.includes('-')) {
    return `Today ${timestamp}`
  }

  // If you have a full date format, parse it here
  // For now, we'll assume all messages are today unless specified
  return `Today ${timestamp}`
}

export function formatConversationTime(timestamp: string): string {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // If timestamp is just time (HH:MM AM/PM format), check if it's today or yesterday
  if (timestamp.includes(':') && !timestamp.includes('/') && !timestamp.includes('-')) {
    // For demo purposes, assume times after current time are "today", before are "today" too
    // In a real app, you'd compare against actual message timestamps
    return timestamp
  }

  return timestamp
}

export function getFormattedTimestamp(date: Date): string {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const timeString = `${hours}:${minutes}`

  if (messageDate.getTime() === today.getTime()) {
    return `Today ${timeString}`
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return `Yesterday ${timeString}`
  } else {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    return `${day}/${month} ${timeString}`
  }
}
