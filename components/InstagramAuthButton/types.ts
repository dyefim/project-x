interface Error {
  error: string | null
  error_reason: string | null
  error_description?: string | null
}

export interface Props {
  clientId: string
  children?: React.ReactNode
  redirectUri?: string
  onFailure: (error: Error) => void
  onSuccess: (response: string | null) => void
}

export type ResolveValue = Record<string, unknown> | string
