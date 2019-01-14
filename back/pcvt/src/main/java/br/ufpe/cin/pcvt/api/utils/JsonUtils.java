package br.ufpe.cin.pcvt.api.utils;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.Map;

public class JsonUtils {

    private static Gson gson = new Gson();

    public static <T> T parseToObject(String object, Class<T> type) {
        return gson.fromJson(object, type);
    }

    public static Map<String, String> parseToSimpleMap(String object) {
        Type type = new TypeToken<Map<String, String>>() {
        }.getType();

        return gson.fromJson(object, type);
    }

    public static Map<String, Object> parseToGenericMap(String object) {
        Type type = new TypeToken<Map<String, Object>>() {
        }.getType();

        return gson.fromJson(object, type);
    }

}
