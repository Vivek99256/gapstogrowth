"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/ui/empty-state";
import { Pagination, PaginationButton } from "@/components/ui/pagination";
import { SearchInput } from "@/components/ui/search-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type SortDirection = "asc" | "desc";

type DataTableColumn<T> = {
  id: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
  className?: string;
};

type DataTableFilter<T> = {
  id: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  predicate: (row: T, value: string) => boolean;
};

type EnterpriseDataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  getSearchText?: (row: T) => string;
  filters?: DataTableFilter<T>[];
  loading?: boolean;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  bulkActions?: (selectedRows: T[]) => React.ReactNode;
  className?: string;
};

function EnterpriseDataTable<T>({
  columns,
  data,
  getRowId,
  getSearchText,
  filters = [],
  loading = false,
  pageSize = 10,
  emptyTitle = "No results found",
  emptyDescription = "Try adjusting your search or filters.",
  bulkActions,
  className,
}: EnterpriseDataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [filterValues, setFilterValues] = React.useState<Record<string, string>>({});
  const [sort, setSort] = React.useState<{ columnId: string; direction: SortDirection } | null>(null);
  const [page, setPage] = React.useState(1);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(() => new Set());

  const filteredData = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filtered = data.filter((row) => {
      const matchesQuery =
        !normalizedQuery ||
        !getSearchText ||
        getSearchText(row).toLowerCase().includes(normalizedQuery);
      const matchesFilters = filters.every((filter) => {
        const value = filterValues[filter.id];
        return !value || value === "all" || filter.predicate(row, value);
      });

      return matchesQuery && matchesFilters;
    });

    if (!sort) return filtered;

    const column = columns.find((candidate) => candidate.id === sort.columnId);
    if (!column?.sortValue) return filtered;

    return [...filtered].sort((left, right) => {
      const leftValue = column.sortValue?.(left) ?? "";
      const rightValue = column.sortValue?.(right) ?? "";
      const result =
        typeof leftValue === "number" && typeof rightValue === "number"
          ? leftValue - rightValue
          : String(leftValue).localeCompare(String(rightValue));

      return sort.direction === "asc" ? result : -result;
    });
  }, [columns, data, filterValues, filters, getSearchText, query, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredData.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const visibleRows = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const visibleIds = visibleRows.map(getRowId);
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const selectedRows = data.filter((row) => selectedIds.has(getRowId(row)));

  React.useEffect(() => {
    setPage(1);
  }, [filterValues, query]);

  function toggleSort(column: DataTableColumn<T>) {
    if (!column.sortValue) return;
    setSort((current) =>
      current?.columnId === column.id
        ? { columnId: column.id, direction: current.direction === "asc" ? "desc" : "asc" }
        : { columnId: column.id, direction: "asc" },
    );
  }

  function toggleVisibleRows() {
    setSelectedIds((current) => {
      const next = new Set(current);
      visibleIds.forEach((id) => (allVisibleSelected ? next.delete(id) : next.add(id)));
      return next;
    });
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchInput
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="md:w-72"
        />
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Select
              key={filter.id}
              value={filterValues[filter.id] ?? "all"}
              onValueChange={(value) => setFilterValues((current) => ({ ...current, [filter.id]: value }))}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder={filter.label} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      {selectedRows.length > 0 && bulkActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-secondary px-4 py-3">
          <p className="text-xs font-bold text-secondary-foreground">{selectedRows.length} selected</p>
          <div className="flex flex-wrap gap-2">{bulkActions(selectedRows)}</div>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  aria-label="Select visible rows"
                  checked={allVisibleSelected}
                  onCheckedChange={toggleVisibleRows}
                />
              </TableHead>
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className}>
                  {column.sortValue ? (
                    <Button type="button" variant="ghost" size="sm" onClick={() => toggleSort(column)}>
                      {column.header}
                      {sort?.columnId !== column.id ? (
                        <ChevronsUpDown />
                      ) : sort.direction === "asc" ? (
                        <ArrowUp />
                      ) : (
                        <ArrowDown />
                      )}
                    </Button>
                  ) : (
                    column.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading &&
              Array.from({ length: 5 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={columns.length + 1}>
                    <Skeleton className="h-8 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            {!loading &&
              visibleRows.map((row) => {
                const rowId = getRowId(row);
                return (
                  <TableRow key={rowId} data-state={selectedIds.has(rowId) ? "selected" : undefined}>
                    <TableCell className="px-4">
                      <Checkbox
                        aria-label={`Select row ${rowId}`}
                        checked={selectedIds.has(rowId)}
                        onCheckedChange={() =>
                          setSelectedIds((current) => {
                            const next = new Set(current);
                            next.has(rowId) ? next.delete(rowId) : next.add(rowId);
                            return next;
                          })
                        }
                      />
                    </TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id} className={column.className}>
                        {column.cell(row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {!loading && visibleRows.length === 0 && (
          <EmptyState title={emptyTitle} description={emptyDescription} className="m-4" />
        )}
      </div>

      <div className="flex flex-col gap-3 text-xs font-semibold text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          Showing {visibleRows.length ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length}
        </span>
        <Pagination>
          <PaginationButton disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
            Previous
          </PaginationButton>
          <PaginationButton active>{currentPage}</PaginationButton>
          <PaginationButton disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>
            Next
          </PaginationButton>
        </Pagination>
      </div>
    </div>
  );
}

export { EnterpriseDataTable };
export type { DataTableColumn, DataTableFilter, EnterpriseDataTableProps };
