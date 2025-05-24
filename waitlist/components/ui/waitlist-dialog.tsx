"use client"

import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { useState } from "react"

export function WaitlistDialog({ trigger }: { trigger: React.ReactNode }) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to join waitlist")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-8 shadow-xl w-full max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] z-50">          <Dialog.Title className="text-2xl font-bold text-black mb-4">
            Join the Waitlist
          </Dialog.Title>
          <Dialog.Description className="text-black mb-6 text-base opacity-80">
            Be the first to know when we launch. Enter your email below to secure your spot.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                disabled={isLoading}
              />
            </div>            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm">
                Successfully joined the waitlist! We'll notify you when we launch.
              </div>
            )}<div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-accent text-black border-2 px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50 transition-colors text-base"
              >
                {isLoading ? "Joining..." : "Join Waitlist"}
              </button>
            </div>
          </form>          <Dialog.Close className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
            <span className="text-black opacity-60 hover:opacity-100 text-lg">✕</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
