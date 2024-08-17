class NoDataFoundError extends Error {
  constructor() {
    super("No Data Found");
    this.name = "NoDataFoundError";
  }
}

export default NoDataFoundError;
