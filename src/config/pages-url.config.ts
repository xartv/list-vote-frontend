class DASHBOARD {
  private root = '/dashboard';

  HOME = this.root;
  CREATED_LISTS = `${this.root}/created-lists`;
  ACCESSED_LISTS = `${this.root}/accessed-lists`;
}

class EXTERNAL {
  AUTH = '/auth';
}

export const DASHBOARD_PAGES = new DASHBOARD();
export const EXTERNAL_PAGES = new EXTERNAL();
