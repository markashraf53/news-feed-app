export default function notificationNamingFn(
  notificationType,
  reactorId,
  postId
) {
  return `${notificationType}-${reactorId}-${postId}`;
}
