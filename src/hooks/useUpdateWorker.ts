import { useState, useEffect, useCallback } from 'react'

export interface UpdateManifest {
  version: string
  pub_date?: string
  notes?: string
  platforms?: {
    [key: string]: {
      url: string
      signature: string
    }
  }
}

export const WORKER_URL = 'https://toketeo-updates.crdsyntax.workers.dev'
export const LATEST_MANIFEST_URL = `${WORKER_URL}/latest.json`

export function useUpdateWorker() {
  const [version, setVersion] = useState<string>('0.4.2')
  const [pubDate, setPubDate] = useState<string>('2026-08-06')
  const [notes, setNotes] = useState<string>('v0.4.2 - Latest stable build with multi-engine query support.')
  const [windowsUrl, setWindowsUrl] = useState<string>(`${WORKER_URL}/Toketeo_0.4.2_x64_en-US.msi`)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  const fetchUpdateInfo = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(LATEST_MANIFEST_URL, { cache: 'no-store' })
      if (!res.ok) {
        throw new Error(`Worker HTTP ${res.status}`)
      }
      const data: UpdateManifest = await res.json()
      if (data.version) {
        setVersion(data.version)
      }
      if (data.pub_date) {
        setPubDate(data.pub_date.split('T')[0])
      }
      if (data.notes) {
        setNotes(data.notes)
      }
      if (data.platforms?.['windows-x86_64']?.url) {
        setWindowsUrl(data.platforms['windows-x86_64'].url)
      } else {
        setWindowsUrl(`${WORKER_URL}/Toketeo_${data.version || '0.4.2'}_x64_en-US.msi`)
      }
      setLastChecked(new Date())
    } catch (err: any) {
      console.warn('Failed to fetch update manifest from worker:', err)
      setError(err?.message || 'Update check failed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUpdateInfo()
  }, [fetchUpdateInfo])

  return {
    version,
    pubDate,
    notes,
    windowsUrl,
    loading,
    error,
    lastChecked,
    checkForUpdates: fetchUpdateInfo,
    workerUrl: WORKER_URL,
  }
}
