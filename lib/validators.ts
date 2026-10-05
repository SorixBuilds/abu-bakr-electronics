export const normalisePhone = (v: string) => v.replace(/[\s-]/g, "");

/** Pakistani mobile: 03XXXXXXXXX or +923XXXXXXXXX */
export const isPkMobile = (v: string) => /^(\+92|0)3\d{9}$/.test(normalisePhone(v));
