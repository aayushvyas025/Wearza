export type APIEnvelope<T> = {
  status: "success" | "error";
  data: T | null;
  meta?: Record<string, unknown>;
  errors?: Array<{ message: string; code?: string }>;
};

export function ok<T>(data: T, meta?: Record<string, unknown>): APIEnvelope<T> {
  return { status: "success", data, meta };
}

export function fail(message: string, code?: string): APIEnvelope<null> {
  return { status: "error", errors: [{ message, code }], data:null };
}
