type CheckoutLineItem = {
  sku: string;
  quantity: number;
  unitPrice: number;
};

type NormalizedCheckoutPayload = {
  customerId: string;
  email: string;
  currency: string;
  couponCode?: string;
  metadata: Record<string, string>;
  items: CheckoutLineItem[];
  subtotal: number;
};

export function normalizeCheckoutPayload(input: any): NormalizedCheckoutPayload {
  const items = (input.items || []).map((item: any) => ({
    sku: String(item.sku || item.id).trim(),
    quantity: parseInt(item.quantity || 1, 10),
    unitPrice: Number(item.unitPrice || item.price || 0),
  }));

  const subtotal = items.reduce(
    (total, item) => total + item.quantity * item.unitPrice,
    0
  );

  return {
    customerId: String(input.customer.id || input.customerId || ""),
    email: String(input.customer.email || input.email || "").toLowerCase(),
    currency: String(input.currency || "usd").toUpperCase(),
    couponCode: input.coupon ? String(input.coupon.code || input.coupon) : undefined,
    metadata: Object.keys(input.metadata || {}).reduce(
      (result, key) => {
        result[key] = String(input.metadata[key]).trim();
        return result;
      },
      {} as Record<string, string>
    ),
    items,
    subtotal: Math.round(subtotal * 100) / 100,
  };
}
