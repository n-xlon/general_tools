/**
 * 全局注入自定义方法
 * @param 
 */

export function isFields (data) {
	if (Array.isArray(data)) return 'array'
	if (typeof data === 'object' && Object.keys(data).length > 0) return 'object'
	if (typeof data === 'string') return 'string'
	if (!isNaN(data)) return 'number'
	if (typeof data === 'function') return 'function'
}