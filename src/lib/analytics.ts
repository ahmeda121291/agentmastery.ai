export function track(event: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event, { props })
  }
}

export const QUIZ_EVENTS = {
  QUIZ_STARTED: 'Quiz Started',
  QUIZ_COMPLETED: 'Quiz Completed',
  QUIZ_SHARE_CLICKED: 'Quiz Share Clicked',
  RESULT_DOWNLOADED: 'Result Downloaded',
  RESULT_CTA_CLICKED: 'Result CTA Clicked',
} as const