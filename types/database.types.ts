﻿export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      appointments: {
        Row: {
          barber_id: string | null;
          barber_name: string | null;
          endtime: string;
          id: string;
          service_id: string | null;
          service_name: string | null;
          starttime: string;
          status: string;
          user_id: string | null;
          user_name: string | null;
        };
        Insert: {
          barber_id?: string | null;
          barber_name?: string | null;
          endtime: string;
          id?: string;
          service_id?: string | null;
          service_name?: string | null;
          starttime: string;
          status: string;
          user_id?: string | null;
          user_name?: string | null;
        };
        Update: {
          barber_id?: string | null;
          barber_name?: string | null;
          endtime?: string;
          id?: string;
          service_id?: string | null;
          service_name?: string | null;
          starttime?: string;
          status?: string;
          user_id?: string | null;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      barbers: {
        Row: {
          bio: string | null;
          experience: number | null;
          id: string;
          isAvailable: boolean | null;
          name: string;
          phone: string;
          shops_id: string | null;
        };
        Insert: {
          bio?: string | null;
          experience?: number | null;
          id?: string;
          isAvailable?: boolean | null;
          name: string;
          phone: string;
          shops_id?: string | null;
        };
        Update: {
          bio?: string | null;
          experience?: number | null;
          id?: string;
          isAvailable?: boolean | null;
          name?: string;
          phone?: string;
          shops_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "barbers_shops_id_fkey";
            columns: ["shops_id"];
            isOneToOne: false;
            referencedRelation: "shops";
            referencedColumns: ["id"];
          }
        ];
      };
      ratings: {
        Row: {
          barber_id: string | null;
          id: string;
          rating: number;
          review: string | null;
        };
        Insert: {
          barber_id?: string | null;
          id?: string;
          rating: number;
          review?: string | null;
        };
        Update: {
          barber_id?: string | null;
          id?: string;
          rating?: number;
          review?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ratings_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          }
        ];
      };
      services: {
        Row: {
          barber_id: string | null;
          duration: unknown;
          id: string;
          name: string;
          price: number;
        };
        Insert: {
          barber_id?: string | null;
          duration: unknown;
          id?: string;
          name: string;
          price: number;
        };
        Update: {
          barber_id?: string | null;
          duration?: unknown;
          id?: string;
          name?: string;
          price?: number;
        };
        Relationships: [
          {
            foreignKeyName: "services_barber_id_fkey";
            columns: ["barber_id"];
            isOneToOne: false;
            referencedRelation: "barbers";
            referencedColumns: ["id"];
          }
        ];
      };
      shops: {
        Row: {
          created_at: string | null;
          id: string;
          isOpen: boolean | null;
          location: Json;
          phone: string;
          shop_name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          isOpen?: boolean | null;
          location: Json;
          phone: string;
          shop_name: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          isOpen?: boolean | null;
          location?: Json;
          phone?: string;
          shop_name?: string;
        };
        Relationships: [];
      };
      users: {
        Row: {
          created_at: string | null;
          id: string;
          isOnboarded: boolean | null;
          isPro: boolean | null;
          phone: string;
          role: string;
          username: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          isOnboarded?: boolean | null;
          isPro?: boolean | null;
          phone: string;
          role: string;
          username: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          isOnboarded?: boolean | null;
          isPro?: boolean | null;
          phone?: string;
          role?: string;
          username?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
