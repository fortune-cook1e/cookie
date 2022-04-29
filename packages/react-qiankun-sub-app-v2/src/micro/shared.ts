class Shared {
	getToken() {
		return localStorage.getItem('token') || ''
	}

	setToken(token: string) {
		localStorage.setItem('token', token)
	}
}

class SharedModule {
	static shared: any = new Shared()

	/**
	 * 重载shared
	 */
	static overloadShared(shared: any): void {
		SharedModule.shared = shared
	}

	/**
	 * 获取 shared 实例
	 */
	static getShared(): any {
		return SharedModule.shared
	}
}

export default SharedModule
