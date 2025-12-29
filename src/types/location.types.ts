/**
 * Type definitions for GeoDB Cities API and location data
 */

/**
 * City option format used in search component
 * value format: "latitude longitude"
 * label format: "City, State, Country" or "City, Country" (if no region code)
 */
export interface CityOption {
  value: string;
  label: string;
}

/**
 * City data from GeoDB Cities API
 */
export interface GeoDBCity {
  id: number;
  wikiDataId?: string;
  type?: string;
  city?: string;
  name: string;
  country: string;
  countryCode: string;
  region?: string;
  regionCode?: string;
  latitude: number;
  longitude: number;
  population: number;
}

/**
 * Metadata from GeoDB API response
 */
export interface GeoDBMetadata {
  currentOffset: number;
  totalCount: number;
}

/**
 * GeoDB Cities API response structure
 */
export interface GeoDBResponse {
  data: GeoDBCity[];
  metadata: GeoDBMetadata;
  links?: Array<{
    rel: string;
    href: string;
  }>;
}

/**
 * Options for loading cities (pagination)
 */
export interface LoadOptions {
  page: number;
}

/**
 * Async paginate response format
 */
export interface AsyncPaginateResponse {
  options: CityOption[];
  hasMore: boolean;
  additional?: {
    page: number;
  };
}
