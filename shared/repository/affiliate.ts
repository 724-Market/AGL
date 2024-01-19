class AffiliateModule {

  private RESOURCE = '/Affiliate';

  async getAffiliateProductPlanList() {
    return await useCallApi().apiRepository(`${this.RESOURCE}/product/plan/list`, {})
  }

  async getAffiliateProductPlan(req: any) {
    return await useCallApi().apiRepository(`${this.RESOURCE}/product/plan/by-user/summary/get`, req)
  }

}

export default AffiliateModule;