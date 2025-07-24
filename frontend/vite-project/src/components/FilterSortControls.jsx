import React from 'react';

const FilterSortControls = ({ filters, setFilters, sort, setSort }) => {
  return (
    <div className="controls">
      <label>
        Category:
        <select value={filters.category} onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}>
          <option value="">All</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">fragrances</option>
          <option value="furniture">furniture</option>
          <option value="groceries">groceries</option>

        </select>

       
        
      </label>

      <label>
        Availability:
        <select value={filters.availability} onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}>
          <option value="">All</option>
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </label>

      <label>
        Sort By:
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="">None</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating-desc">Rating ↓</option>
          <option value="title-asc">Title A-Z</option>
        </select>
      </label>
    </div>
  );
};

export default FilterSortControls;
