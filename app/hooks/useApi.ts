import { useState, useEffect, useRef, useCallback } from "react"
import type { AxiosRequestConfig, AxiosResponse } from "axios"
import { useDeepCompareEffect } from "use-deep-compare"

interface UseApiResult<T, P> {
    data: T | null
    loading: boolean
    error: string | null
    call: (params?: P, config?: AxiosRequestConfig) => Promise<void>
}

function useApi<T, P>(
    callFunction: (
        signal: AbortSignal,
        params?: P,
        config?: AxiosRequestConfig
    ) => Promise<AxiosResponse<T>>,
    options: {
        initialParams?: P
        config?: AxiosRequestConfig
        autoCall?: boolean
        onSuccess?: (data: T) => void
        onError?: (error: string) => void
        errorReport?: boolean
    } = {}
): UseApiResult<T, P> {
    const {
        initialParams,
        autoCall = true,
        onSuccess,
        onError,
        config = undefined
    } = options
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const abortControllerRef = useRef<AbortController | null>(null)
    const callIdRef = useRef(0)

    const call = useCallback(
        async (params?: P, config?: AxiosRequestConfig) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }

        const controller = new AbortController()

        abortControllerRef.current = controller

        const currentCallId = ++callIdRef.current

        setLoading(true)
        setError(null)

        try {
            const result = await callFunction(controller.signal, params, config)

            if (callIdRef.current === currentCallId) {
            setData(result.data)
            if (onSuccess) {
                onSuccess(result.data)
            }
            }
        } catch (err: unknown) {
            if (controller.signal.aborted) {
            return
            }

            if (err instanceof Error && err.name !== "CanceledError") {
            if (callIdRef.current === currentCallId) {
                setError(`Error: ${err.message}`)
                if (onError) {
                onError(err.message)
                }
            }
            throw Error(err.message)
            }
        } finally {
            if (callIdRef.current === currentCallId) {
            setLoading(false)
            }
        }
        },
        [callFunction, onSuccess, onError]
    )

    useDeepCompareEffect(() => {
        if (autoCall) {
        call(initialParams, config ?? undefined)
        }
    }, [autoCall, initialParams, config])

    useEffect(() => {
        return () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }
        }
    }, [])

    return { data, loading, error, call }
}

export default useApi
