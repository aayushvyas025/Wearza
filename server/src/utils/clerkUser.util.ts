import type { User } from "@clerk/backend";

interface UserInfo {
  name: string;
  email: string;
  adminEmails: Set<string>;
}

export function getUserInfoFromClerk(user: User): UserInfo {
  const extractEmailFromUserInfo =
    user.emailAddresses.find((itm) => itm.id === user.primaryEmailAddressId) ||
    user.emailAddresses[0];
  const fullName = [user.firstName, user.lastName].join(" ").trim();
  const raw = process.env.ADMIN_EMAILS || "";

  const email = extractEmailFromUserInfo.emailAddress;
  const name = fullName || user.username!;
  const adminEmails = new Set(
    raw
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean),
  );
  return { name, email, adminEmails };
}
