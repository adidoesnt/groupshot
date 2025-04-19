import jsonBig from "json-bigint";

export const getJson = (data: Record<string, unknown>) => {
  return jsonBig.parse(jsonBig.stringify(data));
};
