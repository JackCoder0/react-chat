import CircularProgress from '@mui/material/CircularProgress'

export function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <CircularProgress />
    </div>
  )
}
