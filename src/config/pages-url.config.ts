class LISTS {
  private root = '/lists';

  HOME = this.root;
  CREATE_LIST = `${this.root}/create`;
  EDIT_LIST = `${this.root}/edit`;
}

class EXTERNAL {
  AUTH = '/auth';
}

export const LISTS_PAGE = new LISTS();
export const EXTERNAL_PAGES = new EXTERNAL();
