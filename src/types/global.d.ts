/**
 * 从 T 中排除属性名为 K 的属性
 */
type ExcludeKey<T, K> = Pick<T, Exclude<keyof T, K>>;
