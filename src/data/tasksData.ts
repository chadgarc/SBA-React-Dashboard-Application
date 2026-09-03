import type { Task } from "../types";

export const tasksData: Task[] = [
    {
      id: '2150',
      title: 'Receive Pallet Shipment',
      description: 'Unload incoming pallet and verify item quantities',
      status: 'pending',
      priority: 'medium',
      dueDate: '2026-04-10'
    },
    {
      id: '2280',
      title: 'Cycle Count Aisle 4',
      description: 'Perform cycle count on bins A4-01 to A4-20',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-04-12'
    },
    {
      id: '2395',
      title: 'Replenish Picking Area',
      description: 'Move inventory from bulk storage to picking shelves',
      status: 'completed',
      priority: 'low',
      dueDate: '2026-04-13'
    },
    {
      id: '2540',
      title: 'Inspect Damaged Box',
      description: 'Check damaged carton and report loss quantity',
      status: 'pending',
      priority: 'medium',
      dueDate: '2026-04-14'
    },
    {
      id: '2675',
      title: 'Pack Out Customer Order',
      description: 'Pack and label order #A-5521 for outbound shipment',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-04-15'
    },
    {
      id: '2788',
      title: 'Sort Returns',
      description: 'Process returned items and restock usable inventory',
      status: 'completed',
      priority: 'low',
      dueDate: '2026-04-16'
    },
    {
      id: '2890',
      title: 'Audit Inventory Discrepancy',
      description: 'Investigate mismatch between system and physical count',
      status: 'pending',
      priority: 'high',
      dueDate: '2026-04-18'
    },
    {
      id: '3015',
      title: 'Label New SKUs',
      description: 'Print and apply barcode labels to new product batch',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2026-04-19'
    },
    {
      id: '3150',
      title: 'Organize Overflow Rack',
      description: 'Clear and reorganize overflow storage rack B',
      status: 'completed',
      priority: 'low',
      dueDate: '2026-04-20'
    },
    {
      id: '3290',
      title: 'Load Outbound Truck',
      description: 'Stage and load pallets for carrier pickup',
      status: 'pending',
      priority: 'high',
      dueDate: '2026-04-22'
    },
    {
      id: '3420',
      title: 'Scan Inventory for Update',
      description: 'Use handheld scanner to update bin locations',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '2026-04-23'
    },
    {
      id: '3565',
      title: 'Clean Packing Station',
      description: 'Remove trash and restock packing materials',
      status: 'completed',
      priority: 'low',
      dueDate: '2026-04-24'
    },
    {
      id: '3720',
      title: 'Verify Purchase Order',
      description: 'Check PO #9921 against received shipment',
      status: 'pending',
      priority: 'medium',
      dueDate: '2026-04-26'
    },
    {
      id: '3890',
      title: 'Move Inventory to Cold Storage',
      description: 'Transfer temperature‑sensitive items to cold room',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2026-04-28'
    },
    {
      id: '4025',
      title: 'Assemble Mixed SKU Pallet',
      description: 'Build pallet with assorted SKUs for cross‑dock',
      status: 'completed',
      priority: 'medium',
      dueDate: '2026-05-05'
    }
  ]