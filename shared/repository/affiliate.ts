class AffiliateModule {

  private RESOURCE = '/Affiliate';

  async getAffiliateProductPlanList() {
    return await useCallApi().apiRepository(`${this.RESOURCE}/product/plan/list`, {})
  }

  async getAffiliateProductPlan(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/product/plan/by-user/summary/get`, req)
  }

  async createAffiliateOrder(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/order/create`, req)
  }

  async getAffiliatePayment(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/payment/get`, req)
  }

}

export default AffiliateModule;